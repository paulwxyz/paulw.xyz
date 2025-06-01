import Link from 'next/link';
import Pages from '../../../public/external.json';

function QuickLinks() {
	return (
		<div className='block'>
			{
				Object.entries(Pages).map(([title, link]) => {
					const extern = link.match(/^http/) && `blue extern` || '';
					return (
						<Link
							key={link}
							href={link}
							className={`${extern} link button`}>
							{title}
						</Link>
					);
				})
			}
		</div>
	);
}

export default QuickLinks;
