import { Auth } from '@supabase/auth-ui-react'
import {
  ThemeSupa
} from '@supabase/auth-ui-shared'
import { SupabaseClient } from '@supabase/supabase-js'

function AuthForm({ supabase }: { supabase: SupabaseClient }) {
  return (
    <div className="mx-auto flex flex-1 w-full justify-center items-center flex-col pt-4">
      <h1 className="text-4xl font-bold mt-8 mb-4">
        Sign in to E2B
      </h1>
      <div className="md:w-[420px] w-[240px]">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            extend: true,
            className: {
              button: 'auth-button',
              divider: 'auth-divider',
              message: 'auth-message',
            },
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email address',
                password_label: 'Password',
              },
            },
          }}
          view='sign_in'
          theme='default'
          showLinks={true}
          providers={['github']}
          providerScopes={{
            github: 'email',
          }}
        />
      </div>
    </div>
  )
}

export default AuthForm