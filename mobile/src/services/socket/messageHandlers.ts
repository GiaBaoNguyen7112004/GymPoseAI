const messageHandlers: Record<string, (data: any) => void> = {
    someKey: (data) => {},

    start_new_exercise: (data) => {
        console.log('Start new exercise:', data)
    },

    resume_exercise: (data) => {
        console.log('Resume exercise:', data)
    }
}
