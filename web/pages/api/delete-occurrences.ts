import type { NextApiRequest, NextApiResponse } from 'next';

// Utils
import DeleteDuplicates from '@utils/DeleteDuplicates';

type Data = {
  msg: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const numberString: String = await req.query.numberArray;
    const numberArray: Array<number> = numberString.split(',');

    const deleteDuplicatesArray: Array<number> = DeleteDuplicates(numberArray);
    const deleteDuplicates = deleteDuplicatesArray.join(",");
    res.status(200).json({ msg: deleteDuplicates });
  } catch (error) {
    res.status(401).json({ error: error.data });
  }
}
