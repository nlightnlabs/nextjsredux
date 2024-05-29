import { useRouter } from 'next/navigation'

interface ActiveLinkPropTypes {
    children: React.ReactNode;
    href: string;
}
 
function ActiveLink({ children, href }:ActiveLinkPropTypes) {
  const router = useRouter()
 
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    router.push(href)
  }
 
  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  )
}
 
export default ActiveLink