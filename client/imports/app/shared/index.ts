import { DisplayNamePipe } from './display-name.pipe';
import { AgePipe, CapitalizePipe, GenderPipe, GenderImgPipe } from './filter.pipe';

export const SHARED_DECLARATIONS: any[] = [
  DisplayNamePipe,
  AgePipe,
  CapitalizePipe,
  GenderPipe,
  GenderImgPipe
];
