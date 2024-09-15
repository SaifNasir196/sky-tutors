import { redirect } from 'next/navigation'
import { SearchUsers } from './dashboard/_search-users'
import { clerkClient } from '@clerk/nextjs/server'
import { setRole } from './dashboard/_actions'
import { checkRole } from '@/lib/utils/roles'

export default async function AdminDashboard(params: { searchParams: { search?: string } }) {


    const query = params.searchParams.search

    const users = query ? (await clerkClient().users.getUserList({ query })).data : []

    return (
        <div className='m-24'>

            <SearchUsers />

            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <div>
                            {user.firstName} {user.lastName}
                        </div>
                        <div>
                            {
                                user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)
                                    ?.emailAddress
                            }
                        </div>
                        <div>{user.publicMetadata.role as string}</div>
                        <div>
                            <form action={setRole}>
                                <input type="hidden" value={user.id} name="id" />
                                <input type="hidden" value="admin" name="role" />
                                <button type="submit">Make Admin</button>
                            </form>
                        </div>
                        <div>
                            <form action={setRole}>
                                <input type="hidden" value={user.id} name="id" />
                                <input type="hidden" value="moderator" name="role" />
                                <button type="submit">Make Moderator</button>
                            </form>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}