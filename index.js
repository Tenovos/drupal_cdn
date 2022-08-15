$ = jQuery;
$(function() {
    console.log( "Custom JavaScript ready!" );
    window.STORYLINK_PROFILE = "eyJuYW1lIjoiREVNTyAtIEFNV0FZIiwiYXBpVXJsIjoiaHR0cHM6Ly9kZW1vLnNlcnZpY2VzLnRlbm92b3MuY2xvdWQvY29udGVudC1zdG9yZS12MSIsImFwaUtleSI6IndUdjVSM2phMm82c3lHek9mUkJTRmF0aHNOS1FUY2JsNnNQbFIyakciLCJjbGllbnRJZCI6IjVkNjRnYTNsaWQ2azU2dGZrY3ZqOHBrMWhsIiwidXNlclBvb2xJZCI6InVzLWVhc3QtMV9pMzkxNUlwNk0iLCJjb2duaXRvVXJsIjoiaHR0cHM6Ly90ZW5vdm9zLWRlbW8uYXV0aC51cy1lYXN0LTEuYW1hem9uY29nbml0by5jb20iLCJjb2duaXRvUHJvdmlkZXJOYW1lIjoiRGVtby1Hb29nbGUtT0lEQyIsImNvbnRlbnRVcmwiOiJodHRwczovL2RlbW8uY29udGVudC50ZW5vdm9zLmlvL3dlYi9icmFuZGluZy9hbXdheSIsImFjY291bnRUeXBlIjoibG9jYWxMb2dpbiIsInVzZXJuYW1lIjoiYW13YXkyMDIwLWFkbWluIiwicGFzc3dvcmQiOiJBbXdheTIwMjAxMjMkIiwiaXNOb25FZGl0YWJsZSI6dHJ1ZX0="
    window.STORYLINK_CONFIG_NAME = "DEMO-AMWAY-WITH-PASS"
    window.STORYLINK_CUSTOM_CONFIG_URL = 'https://extensions.tenovos.io/storylink/aem/custom-configs/demo-amway-aem-config.js'
    // window.ENABLE_UPLOAD = true
    console.log(drupalSettings.remote_image); // value

    try {
        
        let mainDiv = document.getElementsByClassName("help")[0].parentElement

        // <div class="appWrapper"><div id="app"></div></div>

        let appWrapperDiv = document.createElement('div')
        appWrapperDiv.class='appWrapper'

        let appDiv = document.createElement('div')
        appDiv.id = 'app'

        appWrapperDiv.appendChild(appDiv)
        mainDiv.appendChild(appWrapperDiv)

        console.log( "DIVs Created" )

        $.loadScript('https://extensions.tenovos.io/storylink/aem/app.latest.js', {'charset': 'UTF-8', 'lazyLoad': true})
        .done(function () {

            // Setup the events
            console.log('Setting up the Event Bus')
            let eventBus = {}
            try {
                let vueInstance = document.getElementById('app').__vue__
                eventBus = vueInstance.$store.getters.eventBus
            } catch (e){
                console.error ('Problem in setting up the event bus ..'+e)
            }

            // Setup the events
            console.log('Setting up the event listeners')
            if (eventBus && eventBus.$on) try {
                // eventBus.$on('ASSET_SELECTED',(eventPayload) => {
                // 	console.log('Event called: ASSET_SELECTED')
                // 	console.log(eventPayload)
                // })
                eventBus.$on('ASSET_CLICKED',(eventPayload) => {
                    console.log('Event called: ASSET_CLICKED')
                    console.log(eventPayload)

                    if (!eventPayload || !eventPayload.renditions) console.error('No Renditions found')
                    debugger

                    var postData = {
                        'mediaList': [
                            {
                                url: eventPayload.renditions.fpo || eventPayload.renditions.mezzaninePreview,
                                guid: eventPayload.objectId,
                            },
                        ]
                    }

                    /*
                    let tmp3 = wp.media.post( 'add_tenovos_media_without_import', postData )
                        .done((resp)=>{
                            console.log(resp)

                            let vueInstance = document.getElementById('app').__vue__
                            if (resp.failed_urls && resp.failed_urls.length){
                                if (resp.failed_urls[0].includes(' -- ')) { 
                                    let tmp = resp.failed_urls[0].split(' -- ')
                                    vueInstance?.$store?.dispatch('notificationMessage',{ 
                                        message: `Media already exists with ID ${tmp[0]}`,
                                        isError: true 
                                    })
                                } else vueInstance?.$store?.dispatch('notificationMessage',{
                                    message: `Failed to add from url [${resp.failed_urls[0]}]`, 
                                    isError: true
                                })

                            } else {
                                vueInstance?.$store?.dispatch('notificationMessage', {
                                    message: 'Media added successfully' 
                                })
                            }
                        })
                        .fail((error)=>{
                            let vueInstance = document.getElementById('app').__vue__
                            vueInstance?.$store?.dispatch('notificationMessage',{
                                message: `Failed to add media .. ${error}`, 
                                isError: true
                            })
                        })
                    */
                })



            } catch (e){
                console.error ('Problem in setting up the event listeners ..'+e)
            }

            console.log('Setup Completed')
            
        });


        
    } catch (e) {
        console.log(`Problem in enabling StoryLink .. ${e}`)
    }


});
