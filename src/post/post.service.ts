import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { TagService } from './services/tag.service';
import { POST_RELATIONS } from './constants/query-options.constant';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) 
    private postRepository: Repository<Post>,
    private tagService: TagService
  ) {}

  async getAllPosts() {
    return this.postRepository.find(POST_RELATIONS.DEFAULT);
  }

  async getPostById(id: string) {
    return this.postRepository.findOne({
      where: { id },
      ...POST_RELATIONS.DEFAULT
    });
  }

  async getPostByTitle(title: string) {
    return this.postRepository.findOne({
      where: { title },
      ...POST_RELATIONS.DEFAULT
    });
  }

  async getPostByUsername(username: string) {
    return this.postRepository.find({
      where: { author: { username } },
      ...POST_RELATIONS.DEFAULT
    });
  }

  async createPost(createPostDto: CreatePostDto, userId: string) {
    const tags = await this.tagService.findOrCreateTags(createPostDto.tags);
    
    const post = await this.postRepository.save(
      this.postRepository.create({
        title: createPostDto.title,
        content: createPostDto.content,
        author: { id: userId },
        tags
      })
    );

    return this.getPostById(post.id);
  }
}
