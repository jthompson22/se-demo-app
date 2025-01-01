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
