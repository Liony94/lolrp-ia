import { Controller, Get, Post as PostMethod, Body, Req, UseGuards, Param } from '@nestjs/common';
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

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Get('title/:title')
  getPostByTitle(@Param('title') title: string) {
    return this.postService.getPostByTitle(title);
  }

  @Get('username/:username')
  getPostByUsername(@Param('username') username: string) {
    return this.postService.getPostByUsername(username);
  }

  @PostMethod('new')
  @UseGuards(JwtAuthGuard)
  createPost(@Body() createPostDto: CreatePostDto, @Req() request: Request & { user: any }) {
    return this.postService.createPost(createPostDto, request.user.id);
  }
}