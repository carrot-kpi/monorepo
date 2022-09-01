import useMedia from 'react-use/lib/useMedia'

export const useIsMobile = (): boolean => {
  return useMedia('(max-width: 576px)')
}
