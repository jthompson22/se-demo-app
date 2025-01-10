import { unstable_flag as flag } from '@vercel/flags/next';

export const funController = flag<boolean>({
  key: 'showFunController',
  async decide() {
    return false;
  },
  defaultValue: false,
  options: [
    { value: false, label: 'Hide' },
    { value: true, label: 'Show' },
  ],
});


export const catchDerekWu = flag<boolean>({
  key: 'catchDerekWu',
  async decide() {
    return Math.random() < 0.2;
  },
  defaultValue: false,
});

export const gameFlags = [catchDerekWu];
