import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head } from '@inertiajs/react';
import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard(props) {
    const [data, setData] = useState([]);

    const getTestData = () => {
        axios.get(`/api/data/getData`)
            .then(res => {
                const parsedData = JSON.parse(res.data.response);
                setData(parsedData);
            })
    }

    useEffect(() => {
        getTestData();
    }, []);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Test</h2>}
        >
            <Head title="Dashboard" />

            <section className="p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">First name</th>
                                    <th scope="col" className="px-4 py-3">Last name</th>
                                    <th scope="col" className="px-4 py-3">Job title</th>
                                    <th scope="col" className="px-4 py-3">Active</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((person) => {
                                    return (
                                    <tr className="border-b dark:border-gray-700" key={person.id}>
                                        <th scope="row"
                                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {person.first_name}
                                        </th>
                                        <td className="px-4 py-3">{person.last_name}</td>
                                        <td className="px-4 py-3">{person.job_title}</td>
                                        <td className="px-4 py-3">
                                            {person.active === 1 ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">\n' +
                                                '  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />\n' +
                                                '</svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            }
                                        </td>
                                    </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
