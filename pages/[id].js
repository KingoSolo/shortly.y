import  supabase  from '../utils/supabase'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ShortUrlRedirect = () => {
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      const { data, error } = await supabase
        .from('links')
        .select('url,views')
        .eq('id', id)
        .single()
        
      if (error) {
        console.error('Error fetching original URL:', error)
        return
      }

      const newViewsCount = data.views + 1;

      // Update the views count in the database
      const { error: updateError } = await supabase
        .from('links')
        .update({ views: newViewsCount })
        .eq('id', id)
    
      if (updateError) {
        console.error('Error updating views count:', updateError)
        return
      }

      
      window.location.href = data.url
    }
    if (id) redirectToOriginalUrl()
  }, [id])

  return null
}

export default ShortUrlRedirect
