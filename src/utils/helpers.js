/**
 * Get a page's data by id from pageConfig in a template's config file
 * @param {Object} pageConfig  - the page config obj from space theme settings
 * @param {String} pageId  - the id of the page
 * @returns {String} The URL of the page image
 */
export const findPage = (pageConfig, pageId) => {
    return pageConfig.find(({ id }) => id === pageId)
}

/**
 * Finds and returns the current page based on the URL hash.
 *
 * This function extracts the slug from the current URL's hash,
 * then searches through the provided pages array to find a page
 * with a matching slug. If the pathname is '/' or no matching
 * page is found, it returns null.
 *
 * @param {Array} pages - An array of page objects where each object contains a 'slug' property.
 * @returns {Object|null} - The matched page object or null if no match is found or pathname is '/'.
 */
export const renderCurrentPage = (pages) => {
    // Split the URL hash by '#' and take the second part to get the pathname
    const pathname = window.location.hash.split('#')[1]
    // Find the page object that matches the pathname in the pages array
    const page = pages.find(({ slug }) => slug === pathname)

    // If the pathname is '/' or no matching page is found, return null
    if (pathname === '/' || !page) {
        return null
    } else {
        // Otherwise, return the matched page object
        return page
    }
}

export const getCoverImageUrl = (coverImage) => {
    if (typeof window === 'undefined' || !coverImage) {
        return null;
    }

    return `${window.location.origin}${coverImage.url}`;
}

export const parseDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
}

export const getImageUrl = (url, filename, imagesDir) => {
    if (!url) return '/icons/default.svg';
    
    return process.env.NODE_ENV === 'production' 
      ? url 
      : `/${imagesDir}/${filename}`;
}

/**
 * Generates a URL-friendly slug from a title
 * @param {string} title - The title to convert to a slug
 * @returns {string} The generated slug
 */
export const generateSlug = (title) => {
    if (!title) return '';

    // Convert title to lowercase and replace spaces with hyphens
    let slug = title.toLowerCase().replace(/\s+/g, '-');
    
    // Remove special characters
    slug = slug.replace(/[^a-z0-9-]/g, '');
    
    // Remove consecutive hyphens
    slug = slug.replace(/-+/g, '-');
    
    // Remove leading and trailing hyphens
    slug = slug.replace(/^-+|-+$/g, '');
    
    return slug;
}; 

export const handleMediaUpload = async (formImage) => {
    if (formImage instanceof File) {
        try {

            const uploadFormData = new FormData();
            uploadFormData.append('file', formImage);
            uploadFormData.append(
                '_payload',
                JSON.stringify({
                    alt: formImage.name,
                }),
            )

            const response = await fetch(`/api/media`, {
                method: 'POST',
                body: uploadFormData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload media');
            }

            const media = await response.json();
            console.log(media?.doc)
            
            return media?.doc?.id;
        } catch (error) {
            console.error('Error uploading media:', error);
            return;
        }
    }
}

export const handleServerResponse = (response, contentType='Entry', action='updated') => {
    
    if(response.id){
        return { type: 'success', message: `${contentType} ${action} successfully!`}
    } else if(response.title === 'error'){
        return { type: 'error', message: response.message}
    } else {
        return { type: 'error', message: `${contentType} could not be ${action}. Please contact enter@portal8.space`}
    }
}

/**
 * Parse an ISO date string and return formatted time with timezone consideration
 * @param {string} dateString - ISO date string (e.g., "2025-06-28T12:50:10.159Z")
 * @param {string} timezone - Optional timezone (e.g., "America/New_York", "Europe/London")
 * @param {string} format - Optional format ("12h" or "24h", defaults to "12h")
 * @returns {object} Object containing various time representations
 */
export const parseTimeFromISO = (dateString, timezone = null, format = "12h") => {
    try {
      // Parse the ISO string
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date string");
      }
  
      // Get timezone offset in minutes
      const timezoneOffset = date.getTimezoneOffset();
      
      // Create options for formatting
      const timeOptions = {
        hour: format === "24h" ? "2-digit" : "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: format === "12h",
        timeZone: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
      };
  
      const dateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...timeOptions
      };
  
      // Format the time
      const timeFormatter = new Intl.DateTimeFormat("en-US", timeOptions);
      const dateFormatter = new Intl.DateTimeFormat("en-US", dateOptions);
      
      const formattedTime = timeFormatter.format(date);
      const formattedDate = dateFormatter.format(date);
      
      // Get individual components
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      
      // Convert to 12-hour format if needed
      const hours12 = hours % 12 || 12;
      const ampm = hours >= 12 ? "PM" : "AM";
      
      return {
        // Formatted strings
        time: formattedTime,
        date: formattedDate,
        dateTime: `${formattedDate} ${formattedTime}`,
        
        // Individual components
        hours: format === "24h" ? hours : hours12,
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        ampm: format === "12h" ? ampm : null,
        
        // Raw values
        rawHours: hours,
        rawMinutes: minutes,
        rawSeconds: seconds,
        
        // Timezone info
        timezone: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        timezoneOffset: timezoneOffset,
        isUTC: dateString.endsWith("Z"),
        
        // Original date object
        dateObject: date,
        
        // Unix timestamp
        timestamp: date.getTime()
      };
    } catch (error) {
      console.error("Error parsing date:", error);
      return null;
    }
  };