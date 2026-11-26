<p align="center">
  <img src="docs/images/i3dlab-logo.png" alt="I3D LAB Logo" width="180" />
</p>

# I 3D LAB (frontend)

[![React](https://img.shields.io/badge/React-17.0.2%2B-blue)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)](https://www.javascript.com/)

## Table of Contents
- [I 3D LAB (frontend)](#i-3d-lab-frontend)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features & Screenshots](#features--screenshots)
    - [Dashboard & Model Library](#dashboard--model-library)
    - [3D Workspace, Tools & Collaboration](#3d-workspace-tools--collaboration)
    - [2D-to-3D Reconstruction & Point Cloud Segmentation](#2d-to-3d-reconstruction--point-cloud-segmentation)
    - [Cross-Section & Annotations](#cross-section--annotations)
    - [Sample 3D Models](#sample-3d-models)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)

## Introduction

A web-based collaborative 3D model configuration and interactive lab platform.

## Features & Screenshots

### Dashboard & Model Library

| Dashboard (`My Rooms` / `My Models`) | Model Categories |
| :---: | :---: |
| <img src="docs/images/dashboard-rooms-models.png" alt="Dashboard Rooms and Models" width="460" /> | <img src="docs/images/model-categories.png" alt="Model Categories" width="380" /> |

### 3D Workspace, Tools & Collaboration

| Session Toolbar | Editor Toolbar | Transform Panel |
| :---: | :---: | :---: |
| <img src="docs/images/session-toolbar.png" alt="Session Toolbar" width="260" /> | <img src="docs/images/editor-toolbar.png" alt="Editor Toolbar" width="260" /> | <img src="docs/images/model-transform-panel.png" alt="Model Transform Panel" width="160" /> |

| Add Multiple Models | Floating Screen Share | Virtual Whiteboard |
| :---: | :---: | :---: |
| <img src="docs/images/add-multiple-models.png" alt="Add Multiple Models to Session" width="220" /> | <img src="docs/images/floating-screen-share.png" alt="Floating Screen Share" width="420" /> | <img src="docs/images/virtual-whiteboard.png" alt="Virtual Whiteboard" width="260" /> |

### 2D-to-3D Reconstruction & Point Cloud Segmentation

| 2D Input Reference | Reconstructed 3D Model | 3D Heart Point Cloud Segmentation |
| :---: | :---: | :---: |
| <img src="docs/images/2d-input-structure.png" alt="2D Input Structure" width="240" /> | <img src="docs/images/3d-reconstructed-structure.png" alt="3D Reconstructed Structure" width="320" /> | <img src="docs/images/point-cloud-segmentation.png" alt="3D Heart Point Cloud Segmentation" width="340" /> |

### Cross-Section & Annotations

| Cross-Section View (1) | Cross-Section View (2) |
| :---: | :---: |
| <img src="docs/images/cross-section-1.png" alt="3D Cross-Section 1" width="420" /> | <img src="docs/images/cross-section-2.png" alt="3D Cross-Section 2" width="420" /> |

| 3D Pins & Annotations | Marker Note Modal |
| :---: | :---: |
| <img src="docs/images/3d-pins-annotations.png" alt="3D Pins and Annotations" width="460" /> | <img src="docs/images/marker-note-modal.png" alt="Marker Note Modal" width="320" /> |

### Sample 3D Models

| 3D Heart Model | Architectural Structure | Tesla Cybertruck |
| :---: | :---: | :---: |
| <img src="docs/images/sample-3d-heart.png" alt="Sample 3D Heart" width="280" /> | <img src="docs/images/sample-3d-architecture.png" alt="Sample 3D Architecture" width="280" /> | <img src="docs/images/sample-3d-cybertruck.png" alt="Sample 3D Cybertruck" width="280" /> |

## Tech Stack

- **Framework:** React 17.0.2+
- **Programming Language:** JavaScript (ES6+)
- **Build Tool:** Vite
- **State Management:** Zustand/React Query
- **Routing:** React Router
- **Styling:** Tailwind CSS

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (version 14.0.0+ recommended)
- npm or yarn

### Steps
1. **Install dependencies**
    ```sh
    npm install
    # or
    yarn install
    ```

2. **Start the development server**
    ```sh
    npm run
    # or
    yarn run
    ```


This README was generated with ❤️ by Mohammad Hosein Yaghoubi.