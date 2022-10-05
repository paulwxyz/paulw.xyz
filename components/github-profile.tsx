import Image from 'next/image';
import { parse as URIparse } from 'uri-js';
import date from '../lib/date';
import style from '../styles/github-profile.module.css';

function CardRow({label, children}: {label: string, children: JSX.Element | string}) {
    return !children? <></> : (
        <div className={style.cardRow}>
            <span className={style.cardLabel}>{label}</span>
            <span className={style.cardValue}>{children}</span>
        </div>
    );
}

function GitHubProfile({user}: any) {
return (<>
    <div className={style.card}>
        <div className={style.avatarContainer}>
            <Image 
                layout='fixed' 
                width={256} 
                height={256} 
                src={user.avatar_url} 
                alt={`${user.login}'s GitHub profile avatar`} 
                />
        </div> 
        <div className={style.cardTable}>
            <CardRow label='Name'>{user.name}</CardRow>
            <CardRow label='Username'>{user.login}</CardRow>
            <CardRow label='URL'><a href={user.html_url}>{user.html_url}</a></CardRow>
            {user.blog && <CardRow label='Blog'>
                <a href={ !URIparse(user.blog).scheme ? `//${user.blog}`: user.blog}>{user.blog}</a>
            </CardRow>}
            <CardRow label='Location'>{user.location}</CardRow>
            <CardRow label='About'>{user.bio}</CardRow>
            <CardRow label='Created'>{user.created_at ? date.toRelativeDate(user.created_at) : ''}</CardRow>
            {user.updated_at && <CardRow label='Last Updated'>{user.updated_at ? date.toRelativeDate(user.updated_at) : ''}</CardRow>}
            {user.twitter_username && <CardRow label='Twitter'>                
                <a className='link extern blue button' 
                    href={`https://twitter.com/${user.twitter_username}`}>
                        @{user.twitter_username}
                </a>
            </CardRow>}
        </div>
    </div>
    </>);
}

export default GitHubProfile;
