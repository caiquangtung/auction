using System;
using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers
{
    [ApiController]
    [Route("api/auctions")] 
    public class AuctionsController : ControllerBase
    {
        private readonly AuctionDbContext _context;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;

        public AuctionsController(AuctionDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _context = context;
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;
        }

        [HttpGet]
        public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions()
        {   
            var auctions = await _context.Auctions
                .Include(a => a.Item)
                .OrderBy(a => a.Item.Make)
                .ToListAsync();
            return _mapper.Map<List<AuctionDto>>(auctions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
        {   
            var auction = await _context.Auctions
                .Include(a => a.Item)
                .FirstOrDefaultAsync(a => a.Id == id);
            if (auction == null)
            {
                return NotFound();
            }

            return _mapper.Map<AuctionDto>(auction);
        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto createauctionDto)
        {
            var auction = _mapper.Map<Auction>(createauctionDto);
            auction.Seller = User.Identity.Name;
            _context.Auctions.Add(auction);
            var newAuction = _mapper.Map<AuctionDto>(auction);
            await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(newAuction));
            var result = await _context.SaveChangesAsync()>0;
            if(!result) return BadRequest("Couldn't save changes");
            return CreatedAtAction(nameof(GetAuctionById), 
                new { id = auction.Id }, newAuction);
        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAuction(Guid id, UpdateAuctionDto updateAuctionDto)
        {
            var auction = await _context.Auctions.Include(x => x.Item)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (auction == null) return NotFound();
            if(auction.Seller!= User.Identity.Name) return Forbid();
            auction.Item.Make = updateAuctionDto.Make ?? auction.Item.Make;
            auction.Item.Model = updateAuctionDto.Model ?? auction.Item.Model;
            auction.Item.Color = updateAuctionDto.Color ?? auction.Item.Color;
            auction.Item.Mileage = updateAuctionDto.Mileage ?? auction.Item.Mileage;
            auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;
            await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));
            // await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));
            var result = await _context.SaveChangesAsync() > 0;

                if (result)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("Problem saving changes.");
                }

        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuction(Guid id)
        {
            var auction = await _context.Auctions.FindAsync(id);
            if (auction == null) return NotFound();
            if (auction.Seller != User.Identity.Name) return Forbid();
            Console.WriteLine(auction.Id);
            // Cách 1: Tạo instance của AuctionDeleted đúng cách
            // await _publishEndpoint.Publish(new AuctionDeleted { Id = auction.Id.ToString() });
            
            // Hoặc Cách 2: Nếu muốn giữ cú pháp anonymous object
            _context.Auctions.Remove(auction);
            await _publishEndpoint.Publish<AuctionDeleted>(new { Id = auction.Id.ToString() });
            // await _publishEndpoint.Publish<AuctionDeleted>(new AuctionDto { Id = auction.Id });
            var result = await _context.SaveChangesAsync();

            if (result > 0) return Ok();
            
            return BadRequest("Problem deleting the auction.");
        }
    }
}
