import { HighlightType } from "@/interfaces/highlights.interface"
import { IsNotEmpty, IsString, MaxLength, IsEnum, IsOptional } from "class-validator"

export class QueryHighlightDto {
  @IsString()
  @IsOptional()
  public designation

  @IsString()
  @IsOptional()
  public start

  @IsString()
  @IsOptional()
  public end
}

export class DesignateHighlightDto {
  @IsEnum(HighlightType)
  @IsNotEmpty()
  public designation
}

export class CreateHighlightDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public content
}

export class GetPendingHighlightsDto {
  @IsString()
  public timezone
}
