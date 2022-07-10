import type { NextApiRequest, NextApiResponse } from 'next';

// Utils
import SalaryToPay from '@utils/SalaryToPay';

type Data = {
  msg: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const startTime: String = await req.query.startTime;
    const endTime: String = await req.query.endTime;
    const salaryHours: number = await req.query.salaryHours;
    const multiplier: number = await req.query.multiplier;
    const totalSalaryDay: number = SalaryToPay(startTime, endTime, salaryHours, multiplier);
    res.status(200).json({ msg: totalSalaryDay });
  } catch (error) {
    res.status(401).json({ error: error.data });
  }
}
