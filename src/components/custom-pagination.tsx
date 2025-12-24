import { Button } from '@ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@ui/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import { cn } from '@/lib/utils';
import usePagination from '@/hooks/use-pagination';

type CustomPaginationProps = React.ComponentProps<typeof Pagination> &
  Parameters<typeof usePagination>['0'] & {
    onPaginate?: (page: number) => void;
  };
const CustomPagination: FC<CustomPaginationProps> = ({
  totalPages,
  chunkSize,
  defaultPage,
  onPaginate,
  className,
  ...props
}) => {
  const {
    currentPage,
    chunkPages,
    goToNext,
    goToPage,
    goToPrev,
    hasNext,
    hasPrev,
    hasNextChunk,
    hasPrevChunk,
    lastPage,
  } = usePagination({
    totalPages,
    chunkSize,
    defaultPage,
  });
  const { t } = useTranslation();
  useEffect(() => {
    onPaginate?.(currentPage);
  }, [onPaginate, currentPage]);
  return (
    <Pagination className={cn('mx-0 w-fit', className)} {...props}>
      <PaginationContent>
        <PaginationItem>
          <Button variant="secondary" onClick={goToPrev} disabled={!hasPrev}>
            <ChevronLeftIcon className="size-4 rtl:rotate-180" />
            <span>{t('Global.previous')}</span>
          </Button>
        </PaginationItem>
        {hasPrevChunk && (
          <>
            <PaginationItem>
              <Button
                size={'icon'}
                className="text-center leading-0"
                variant={currentPage === 1 ? 'default' : 'secondary'}
                aria-checked={currentPage === 1}
                aria-label={`Go to page 1`}
                aria-current={currentPage === 1 ? 'page' : undefined}
                onClick={() => goToPage(1)}
              >
                1
              </Button>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        {chunkPages.map((page) => (
          <PaginationItem key={page}>
            <Button
              size={'icon'}
              className="text-center leading-0"
              variant={currentPage === page ? 'default' : 'secondary'}
              aria-checked={currentPage === page}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              onClick={() => goToPage(page)}
            >
              {page}
            </Button>
          </PaginationItem>
        ))}
        {hasNextChunk && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <Button
                size={'icon'}
                className="text-center leading-0"
                variant={currentPage === lastPage ? 'default' : 'secondary'}
                aria-checked={currentPage === lastPage}
                aria-label={`Go to page ${lastPage}`}
                aria-current={currentPage === lastPage ? 'page' : undefined}
                onClick={() => goToPage(lastPage)}
              >
                {lastPage}
              </Button>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <Button onClick={goToNext} disabled={!hasNext} variant="secondary">
            <span>{t('Global.next')}</span>
            <ChevronRightIcon className="size-4 rtl:rotate-180" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
