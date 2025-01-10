import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>)  {}

  async getAllPosts () {
    return this.postRepository.find();
  }

  async createPost(createPostDto: CreatePostDto, userId: string) {
    const post = this.postRepository.create({
      title: createPostDto.title,
      content: createPostDto.content,
      author: { id: userId },
      tags: createPostDto.tags.map(tagName => ({ name: tagName }))
    });
    return this.postRepository.save(post);
  } 
}
