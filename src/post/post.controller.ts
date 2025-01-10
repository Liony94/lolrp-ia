import { Controller, Get, Post as PostMethod, Body, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @PostMethod('new')
  @UseGuards(JwtAuthGuard)
  createPost(@Body() createPostDto: CreatePostDto, @Req() request: Request & { user: any }) {
    return this.postService.createPost(createPostDto, request.user.id);
  }
}