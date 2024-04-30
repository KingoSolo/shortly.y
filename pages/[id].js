import { useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '/Users/Solomon/Documents/shh/utils/supabase.js'

const ShortUrlRedirect = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from('links')
        .select('url, views')
        .eq('id', id)
        //user can not return to the previous page 
        if (data && data.length > 0) {
          window.location.replace(data[0].url);
        }
    

      if (error) {
        console.error('Error fetching original URL:', error);
        return;
      }

      // Update the views count in the database
      const newViewsCount = data.views + 1;
      const { error: updateError } = await supabase
        .from('links')
        .update({ views: newViewsCount })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating views count:', updateError);
        return;
      }

      window.location.href = data.url;
    };

    if (id) redirectToOriginalUrl();
  }, [id]);

  return null; // This component does not render anything
};

export default ShortUrlRedirect;
