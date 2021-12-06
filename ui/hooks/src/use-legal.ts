import { useQuery } from 'react-query';
import { lastValueFrom } from 'rxjs';
import getSDK from '@akashaproject/awf-sdk';
import { LEGAL_DOCS } from '@akashaproject/ui-awf-typings';
import { logError } from './utils/error-handler';

export const LEGAL_KEY = 'Legal';

const getLegalDoc = async docName => {
  const sdk = getSDK();
  const res = await lastValueFrom(sdk.services.common.ipfs.getLegalDoc(docName));
  return res.data;
};

/**
 * Hook to get legal docs stored on ipfs
 * @param docName - type of document to retrieve
 */
export function useLegalDoc(docName: LEGAL_DOCS) {
  return useQuery([LEGAL_KEY, docName], () => getLegalDoc(docName), {
    enabled: !!docName,
    keepPreviousData: true,
    onError: (err: Error) => logError('useLegal.getLegalDoc', err),
  });
}