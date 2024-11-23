import Cookies from 'js-cookie';

export async function csrfFetch (url, options = {}) {
    options.method = options.method || 'GET';
    options.headers = options.headers || {};
    
    if (options.method.toUpperCase() !== 'GET') {
        const csrfToken = Cookies.get('XSRF-TOKEN');
        if (csrfToken) {
          options.headers['X-CSRF-Token'] = csrfToken;
        }
    }

    if (!options.headers['Content-Type'] && !(options.body instanceof FormData)) {
        options.headers['Content-Type'] = 'application/json'
    }


    const res = await window.fetch(url, options);

    if (res.status >= 400) {
        throw new Error('Skill issue');
    }

    return res;
}

export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}
  