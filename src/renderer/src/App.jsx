import React, { useState } from 'react'
import { ConfigProvider, Layout, theme } from 'antd';
import { HashRouter, Routes, Route } from "react-router-dom"

import Navigation from './components/navigation/index';

import RandomStringGenerator from './features/random_string_generator';

import './App.css'

const { Content, Sider } = Layout;



function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <HashRouter>
          <Layout>
            <Sider
              trigger={null} collapsible collapsed={collapsed}
              style={{
                backgroundColor: colorBgContainer
              }}
            >
              <Navigation />
            </Sider>
            <Layout>
              <Content
                style={{
                  margin: '24px 16px',
                  minHeight: '90vh',
                  borderRadius: borderRadiusLG,
                  color: 'white'
                }}
              >
                <Routes>
                  {/* <Route path="/" exact element={<div>Path 1</div>} /> */}
                  <Route default path="/" exact element={<RandomStringGenerator />} />
                  <Route default path="/randomstringgenerator" exact element={<RandomStringGenerator />} />
                  <Route path="/test" exact element={<div>Path 2</div>} />
                  <Route path="/test2" exact element={<div>Path 3</div>} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </HashRouter>
      </ConfigProvider>
    </>
  )
}



export default App
