export class CreateCommentDto {
  public offerId!: string;
  public text!: string;
  public publicationDate!: Date;
  public rating!: number;
  public author!: string;
}
