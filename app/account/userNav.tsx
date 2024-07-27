import { createClient } from '@/utils/supabase/server';
import s from './Navbar.module.css';
import Navlinks from './Navlinks';

export default async function UserNavbar() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <div className='bg-gray-300'>
        <nav className={s.root}>
        <a href="#skip" className="sr-only focus:not-sr-only">
            Skip to content
        </a>
        <div className="max-w-6xl px-6 mx-auto bg-gray-300 ">
            <Navlinks user={user} />
        </div>
        </nav>
    </div>
  );
};