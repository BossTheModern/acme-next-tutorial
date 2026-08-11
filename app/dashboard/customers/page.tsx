import { Metadata } from 'next';
import { FormattedCustomersTable } from '@/app/lib/definitions';
import CustomersTable from '@/app/ui/customers/table';
import { fetchFilteredCustomers, fetchCustomersPages } from '@/app/lib/data';
import { Suspense } from 'react';
import Pagination from '@/app/ui/invoices/pagination';


export const metadata: Metadata = {
    title: "Customers page",
};

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
    }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const customers: FormattedCustomersTable[] = await fetchFilteredCustomers(query);
    const totalPages = await fetchCustomersPages();

    return (
        <div className="w-full">
            <Suspense>
                <CustomersTable customers={customers} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}