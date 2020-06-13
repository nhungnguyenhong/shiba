<template>
</template>

<script>
    export default {
        created () {
            this.$session.destroy()
            this.$router.push('/login')
        }
    }
</script>