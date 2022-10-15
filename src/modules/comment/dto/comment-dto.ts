export class DataCommentDto {
  public text!: string;
  public publicationDate!: Date;
  public rating!: number;
  public author!: string;
}

export class CreateCommentDto extends DataCommentDto {
  public offerId!: string;
}
