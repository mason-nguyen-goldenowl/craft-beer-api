import { EntityRepository, Repository } from 'typeorm';

import { Products } from './product.entity';

@EntityRepository(Products)
export class ProductsRepository extends Repository<Products> {}
