<template>
    <p>
        Redirecting...
    </p>
</template>

<script>
    export default {
        name: 'GoogleLoginCallback',
        mounted() {
            // get the URL parameters which will include the auth token
            const paramsString = window.location.search;
            const urlParams = new URLSearchParams(paramsString);
            console.log("callback params=" + urlParams);
            console.log('window.opener=' + window.opener);
            if (window.opener) {
                // send them to the opening window
                window.opener.postMessage({
                    state: urlParams.get('state'),
                    code: urlParams.get('code'),
                    googleLogin: true
                });
                // close the popup
                window.close();
            }
        }
    }
</script>
