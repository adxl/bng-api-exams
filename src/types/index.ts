import { IsOptional, IsString, IsUUID } from 'class-validator';
import { UserRole } from './user-role';

export class EntityReference {
  @IsUUID(4)
  id: string;
}

export class RequestPayload {
  @IsUUID(4)
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  token?: string;

  @IsOptional()
  roles?: UserRole[] | '*';

  @IsUUID(4)
  @IsOptional()
  userId?: string;
}
