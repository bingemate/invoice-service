export class StatusTransition {
  finalized_at: number;
  paid_at: number;

  constructor(partial: Partial<StatusTransition>) {
    Object.assign(this, partial);
  }
}
