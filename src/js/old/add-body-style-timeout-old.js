// so far this is the best way way (at least lighthoue performance wise) to do the big background image
// consistently getting scores 90+ on the dev version
    
    // tried using a window load event, didn't help the performance
    // using setTimeout does though, longer the timeout, higher the score, seemingly
    // bit hacky though!
    const bodyStyleTimeout = setTimeout(() => {
        const body = document.body;
        body.classList.add('body-aboutus');
    }, 500);