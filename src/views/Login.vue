<template>
    <div class="center">
        <h2> <font-awesome-icon icon="user" /> Account Login</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <div v-show="loginFailure" class="invalid-feedback">Login invalid</div>
            </div>
            <div class="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
            <div class="form-group">
                <router-link to="/register"><div style="display:inline-block" class="btn large main success negative">Register</div></router-link>
                <button class="btn large primary main" :disabled="loggingIn">Login</button>
                <img v-show="loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                username: '',
                password: '',
                submitted: false
            }
        },
        computed: {
            loggingIn () {
                return this.$store.state.authentication.status.loggingIn;
            },

            loginFailure () {
                return this.$store.state.authentication.status.loginFailure;
            }
        },
        created () {
            // reset login status
            this.$store.dispatch('authentication/logout');
        },
        methods: {
            async handleSubmit () {
                this.submitted = true;
                const {username, password} = this;
                const {dispatch} = this.$store;
                if (username && password) {
                    await dispatch('authentication/login', {username, password});
                    if(this.$store.state.authentication.status.loggedIn)
                        this.$router.push('/').catch(() => {}); //  Why throws undefined ???
                }
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .center {
        width: 500px;
        margin: 0 auto;
    }
    input {
        margin: 5px 0px 5px 20px;
        height: 34px;
        width: 65%;
        color: #4c4c4c;
        font-size: 16px;
    }
    label {
        width: 35%;
    }

    .btn.main {
        text-transform: uppercase;
        color: white;
    }
    .btn.primary {
        background-color: #3ec1e6;
        border: 1px solid #3ec1e6;
    }
    .btn.large {
        font-size: 0.75rem;
        height: 40px;
        line-height: 40px;
        width: 40%;
        margin: 15px 10px;
    }
    .btn {
        border-radius: 4px;
        font-weight: 400;
        font-family: Helvetica;
    }

    .btn.negative.success {
        background-color: #fff;
        border: 1px solid #5cb85c;
        color: #5cb85c;
    }

</style>
