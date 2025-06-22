import { useEffect, useState, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
// import BootSplash from "react-native-bootsplash"
import moment from 'moment'

import * as Storage from '@/utils/storage'
import { authApi, setApiConfig, useAppUtils } from '@/store'
import { TUser, TLang } from '@/types'

type Props = {
  children: ReactNode
  setNavigatorFlow: (flow: 'login' | 'home') => void
}

const { useLazyGetMeQuery } = authApi

const Init = ({ children, setNavigatorFlow }: Props) => {
  const { i18n } = useTranslation()
  const [triggerGetMe] = useLazyGetMeQuery()
  const { setIsLogined } = useAppUtils()
  const [inited, setInited] = useState(false)

  useEffect(() => {
    const initApp = async () => {
      try {
        await setApiConfig({
          baseUrl: 'https://example.com',
        })

        const savedLang = (await Storage.getItem("LANG")) as TLang


        let resultUser: TUser | null = null
        const result = await triggerGetMe()

        if (result.isSuccess) {
          resultUser = result.data
          setIsLogined(true)
        }

        await i18n.changeLanguage(savedLang)
        moment.locale(savedLang === 'vi' ? 'vi' : 'en')

        if (resultUser?.email) {
          setNavigatorFlow('home')
        } else {
          setNavigatorFlow('login')
        }

        // BootSplash.hide({ fade: true })
      } catch (e) {
        setNavigatorFlow('login')
      }

      setInited(true)
    }

    initApp()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {inited ? children : null}
    </>
  )
}

export default Init
