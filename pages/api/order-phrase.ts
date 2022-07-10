import type { NextApiRequest, NextApiResponse } from 'next';

// Utils
import OrderPhrase from '@utils/OrderPhrase';

type Data = {
  msg: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const phrase: String = await req.query.phrase;
    const orderPhrase: String = OrderPhrase(phrase);
    res.status(200).json({ msg: orderPhrase });
  } catch (error) {
    res.status(401).json({ error: error.data });
  }
}
