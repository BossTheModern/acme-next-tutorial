import { Metadata } from 'next';
import { FormattedCustomersTable } from '@/app/lib/definitions';
import CustomersTable from '@/app/ui/customers/table';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { Suspense } from 'react';


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

    return (
        <Suspense>
            <CustomersTable customers={customers} />
        </Suspense>
    );
}