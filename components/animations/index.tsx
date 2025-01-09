import { connection } from 'next/server';
import { funController } from '@/app/flags';

import FunController from './fun-controller'; // Changed import name

export default async function FunAnimations() {
  await connection();
  const showFunController = await funController();

  if (!showFunController) {
    return null;
  }

  return <FunController />;
}
