import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { AemRenderer } from './ui/aem/aem-renderer';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard | @lllariogonzalez',
    default: 'Acme Dashboard by @lllariogonzalez',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://nextjs-dashboard-acme.vercel.app'),
  authors: [{name: 'Mario Gonzalez', url:'https://www.linkedin.com/in/lllariogonzalez'}],
  keywords: ['Next.js 14', 'Acme', 'Dashboard', 'nextjs.org/learn', 'Server Actions'],
  openGraph: {
    title: 'Acme Dashboard',
    description: 'The official Next.js Learn Dashboard built with App Router.',
    url: 'https://nextjs-dashboard-acme.vercel.app',
    type: 'website',
  },
  twitter: {
    site: '@acme',
    description:'The official Next.js Learn Dashboard built with App Router.',
    title:'Acme Dashboard by @lllariogonzalez',
    creator:'@lllariogonzalez',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const headersList = headers();
	const path = headersList.get('urlPathHeader') || '';


  const isAemPreview = !!headersList.get('aemModelHeader');
	const pagePath: string = headersList.get('aemModelHeader') || '';
	

  return (
    <html lang="en">
      <head>
				<meta content="disabled" property="cq:pagemodel_router" />
				{isAemPreview ? <base href={process.env.FRONT_END_HOST} /> : null}
			</head>
      <body>
        <AemRenderer host={process.env.NEXT_PUBLIC_AEM_HOST || ''} isAemPreview={isAemPreview} pagePath={pagePath || path}
						pathPrefix={process.env.NEXT_PUBLIC_AEM_PATH_PREFX || ''}
						project={process.env.NEXT_PUBLIC_PROJECT || ''}
					/>
        {children
      }</body>
    </html>
  );
}
