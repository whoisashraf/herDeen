import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ellipse, Path, Polygon, Svg, SvgXml } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SVG_RATIO = 334 / 272;
const COUNTER_WIDTH = Math.min(SCREEN_WIDTH * 0.78, 308);
const COUNTER_HEIGHT = COUNTER_WIDTH * SVG_RATIO;

const DARK_SEGMENT_ACTIVE = '#FFFFFF';
const DARK_SEGMENT_INACTIVE = '#6A6F76';

type SegmentKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';

const SEGMENT_POLYGONS: Record<SegmentKey, string> = {
  a: '8,0 32,0 36,4 32,8 8,8 4,4',
  b: '40,8 36,12 32,16 32,30 36,34 40,30',
  c: '40,44 36,40 32,44 32,58 36,62 40,58',
  d: '8,66 32,66 36,70 32,74 8,74 4,70',
  e: '0,44 4,40 8,44 8,58 4,62 0,58',
  f: '0,8 4,12 8,16 8,30 4,34 0,30',
  g: '8,33 32,33 36,37 32,41 8,41 4,37',
};

const DIGIT_SEGMENTS: Record<string, SegmentKey[]> = {
  '0': ['a', 'b', 'c', 'd', 'e', 'f'],
  '1': ['b', 'c'],
  '2': ['a', 'b', 'd', 'e', 'g'],
  '3': ['a', 'b', 'c', 'd', 'g'],
  '4': ['b', 'c', 'f', 'g'],
  '5': ['a', 'c', 'd', 'f', 'g'],
  '6': ['a', 'c', 'd', 'e', 'f', 'g'],
  '7': ['a', 'b', 'c'],
  '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  '9': ['a', 'b', 'c', 'd', 'f', 'g'],
};

function SevenSegmentDigit({ value }: { value: string }) {
  const active = DIGIT_SEGMENTS[value] ?? [];

  return (
    <Svg width={30} height={56} viewBox="0 0 40 74">
      {(Object.keys(SEGMENT_POLYGONS) as SegmentKey[]).map((key) => (
        <Polygon
          key={key}
          points={SEGMENT_POLYGONS[key]}
          fill={active.includes(key) ? DARK_SEGMENT_ACTIVE : DARK_SEGMENT_INACTIVE}
        />
      ))}
    </Svg>
  );
}

function ResetAngryIcon() {
  return (
    <Svg width={64} height={38} viewBox="0 0 120 74">
      <Path
        d="M9 16C21 9 34 10 43 24"
        stroke="#F04444"
        strokeWidth={16}
        strokeLinecap="round"
      />
      <Path
        d="M111 16C99 9 86 10 77 24"
        stroke="#F04444"
        strokeWidth={16}
        strokeLinecap="round"
      />
      <Path
        d="M33 58C45 43 75 43 87 58"
        stroke="#F04444"
        strokeWidth={14}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const LIGHT_TASBIH_SVG = String.raw`<svg width="272" height="334" viewBox="0 0 272 334" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_n_127_3546)">
<path d="M0.0200999 120.989C-0.194037 105.19 1.7581 89.5685 4.69626 74.0539C6.68823 63.5493 9.89032 53.3942 15.8911 44.1712C23.4108 32.6179 34.2621 24.5973 46.8066 18.2964C59.8988 11.7392 73.8625 7.54943 88.3392 4.59937C106.013 0.996847 123.891 -0.34536 141.908 0.0740791C166.425 0.647313 190.363 4.26847 213.196 13.0254C224.366 17.313 234.824 22.7658 243.857 30.3856C255.062 39.8556 261.785 51.8236 265.167 65.3995C270.983 88.6105 273.105 112.498 271.461 136.289C270.414 151.382 267.693 166.332 263.344 180.899C259.624 193.347 255.107 205.6 251.502 218.066C249.878 223.701 249.405 229.657 248.793 235.501C247.846 244.519 247.697 253.63 246.372 262.592C243.808 279.887 235.043 294.283 221.592 306.302C210.759 315.973 197.575 323.033 183.177 326.874C174.557 329.204 165.747 331.306 156.908 332.583C145.42 334.168 133.767 334.425 122.213 333.347C108.378 332.144 94.9127 329.535 81.9549 324.804C63.813 318.172 48.8583 307.677 37.8277 292.531C31.9166 284.44 27.7583 275.543 26.3141 265.798C24.9397 256.529 23.8242 247.185 23.3959 237.836C22.951 227.926 20.9043 218.137 17.3254 208.801C12.2558 195.426 8.41626 181.724 5.30879 167.822C1.85271 152.363 -0.228897 136.797 0.0200999 120.989Z" fill="#FEA1CD"/>
<path d="M89.5371 10.4785C106.181 7.08597 123.054 5.7464 140.117 6.03906L141.769 6.07227C165.792 6.63401 189.016 10.1783 211.048 18.6279V18.627C221.811 22.7586 231.619 27.9119 239.984 34.9668V34.9678C250.11 43.526 256.229 54.3401 259.345 66.8496L259.347 66.8584C265.011 89.4593 267.075 112.715 265.476 135.874C264.459 150.523 261.818 165.037 257.595 179.182C255.765 185.303 253.737 191.386 251.684 197.59C249.641 203.761 247.577 210.042 245.738 216.399L245.736 216.405C244.381 221.109 243.751 226.003 243.273 230.514L242.825 234.875C242.338 239.516 242.054 244.204 241.739 248.643C241.46 252.583 241.153 256.389 240.66 260.12L240.437 261.715C238.112 277.384 230.192 290.571 217.597 301.826C207.484 310.854 195.145 317.471 181.631 321.076L181.621 321.079L181.611 321.081C173.623 323.241 165.613 325.162 157.644 326.405L156.088 326.639C145.057 328.161 133.866 328.408 122.77 327.373L122.732 327.369L121.476 327.256C108.5 326.043 95.9895 323.541 84.0117 319.168C66.8328 312.888 52.9147 303.056 42.6777 288.999L42.6729 288.991L42.165 288.288C36.9775 281.008 33.4819 273.238 32.249 264.919V264.918C30.9747 256.323 29.942 247.768 29.4756 239.262L29.3896 237.562C28.9152 227.005 26.7346 216.584 22.9277 206.653C17.9868 193.613 14.2242 180.203 11.1641 166.513C7.78204 151.385 5.77983 136.304 6.01953 121.084L6.02051 120.996L6.01953 120.908C5.81269 105.648 7.69772 90.4517 10.5918 75.1699L10.5908 75.1689C12.4985 65.1098 15.4938 55.7819 20.9189 47.4434L20.9199 47.4443C27.6625 37.0851 37.5184 29.675 49.499 23.6572C61.5892 17.6027 74.5633 13.6143 88.2139 10.752L89.5371 10.4785Z" stroke="black" stroke-opacity="0.1" stroke-width="12" stroke-miterlimit="10"/>
<circle cx="136" cy="228" r="60" fill="black" fill-opacity="0.1"/>
<circle cx="136.5" cy="228.5" r="45.5" fill="black" fill-opacity="0.1"/>
<path d="M110.375 225.304L110.471 222.392H119.543L119.623 225.304H118.519L118.183 223.24H116.071C116.06 223.912 116.049 224.595 116.039 225.288C116.039 225.971 116.039 226.659 116.039 227.352V228.04C116.039 228.712 116.039 229.389 116.039 230.072C116.049 230.744 116.06 231.416 116.071 232.088L117.575 232.248V233H112.423V232.248L113.927 232.088C113.948 231.427 113.959 230.76 113.959 230.088C113.959 229.405 113.959 228.723 113.959 228.04V227.352C113.959 226.669 113.959 225.987 113.959 225.304C113.959 224.611 113.948 223.923 113.927 223.24H111.831L111.495 225.304H110.375ZM125.773 233.192C125.346 233.192 124.999 233.085 124.733 232.872C124.466 232.659 124.285 232.365 124.189 231.992C123.794 232.397 123.437 232.707 123.117 232.92C122.797 233.123 122.381 233.224 121.869 233.224C121.271 233.224 120.765 233.053 120.349 232.712C119.943 232.36 119.741 231.859 119.741 231.208C119.741 230.867 119.821 230.552 119.981 230.264C120.141 229.965 120.423 229.688 120.829 229.432C121.245 229.176 121.837 228.925 122.605 228.68C122.818 228.605 123.058 228.531 123.325 228.456C123.591 228.381 123.863 228.307 124.141 228.232V227.784C124.141 227.037 124.034 226.536 123.821 226.28C123.618 226.013 123.255 225.88 122.733 225.88C122.637 225.88 122.53 225.885 122.413 225.896C122.306 225.907 122.194 225.923 122.077 225.944L121.885 226.824C121.842 227.208 121.73 227.491 121.549 227.672C121.367 227.853 121.143 227.944 120.877 227.944C120.365 227.944 120.066 227.704 119.981 227.224C120.077 226.584 120.418 226.072 121.005 225.688C121.602 225.304 122.386 225.112 123.357 225.112C124.285 225.112 124.962 225.336 125.389 225.784C125.815 226.221 126.029 226.963 126.029 228.008V231.496C126.029 231.976 126.183 232.216 126.493 232.216C126.695 232.216 126.882 232.099 127.053 231.864L127.421 232.184C127.229 232.547 126.999 232.808 126.733 232.968C126.477 233.117 126.157 233.192 125.773 233.192ZM121.613 230.872C121.613 231.288 121.719 231.592 121.933 231.784C122.157 231.965 122.429 232.056 122.749 232.056C122.93 232.056 123.111 232.013 123.293 231.928C123.474 231.843 123.757 231.667 124.141 231.4V228.872C123.917 228.947 123.703 229.016 123.501 229.08C123.309 229.144 123.143 229.203 123.005 229.256C122.471 229.469 122.103 229.715 121.901 229.992C121.709 230.269 121.613 230.563 121.613 230.872ZM127.645 236.728V236.072L128.733 235.864C128.743 235.395 128.749 234.941 128.749 234.504C128.759 234.077 128.765 233.661 128.765 233.256V228.792C128.765 228.355 128.759 228.008 128.749 227.752C128.749 227.485 128.738 227.192 128.717 226.872L127.597 226.728V226.12L130.253 225.112L130.509 225.272L130.589 226.248C131.314 225.491 132.114 225.112 132.989 225.112C133.565 225.112 134.087 225.272 134.557 225.592C135.026 225.901 135.394 226.355 135.661 226.952C135.938 227.549 136.077 228.275 136.077 229.128C136.077 229.971 135.922 230.701 135.613 231.32C135.314 231.928 134.914 232.397 134.413 232.728C133.911 233.059 133.351 233.224 132.733 233.224C132.338 233.224 131.97 233.149 131.629 233C131.287 232.851 130.962 232.611 130.653 232.28V233.24C130.653 233.635 130.653 234.045 130.653 234.472C130.663 234.909 130.674 235.363 130.685 235.832L131.933 236.072V236.728H127.645ZM132.237 226.248C131.991 226.248 131.741 226.312 131.485 226.44C131.239 226.568 130.978 226.739 130.701 226.952V231.48C131.149 231.896 131.623 232.104 132.125 232.104C132.658 232.104 133.106 231.875 133.469 231.416C133.842 230.947 134.029 230.216 134.029 229.224C134.029 228.243 133.863 227.501 133.533 227C133.202 226.499 132.77 226.248 132.237 226.248ZM140.786 233V232.344L141.826 232.136C141.837 231.741 141.842 231.315 141.842 230.856C141.842 230.387 141.842 229.981 141.842 229.64V228.792C141.842 228.355 141.837 228.008 141.826 227.752C141.826 227.485 141.816 227.192 141.794 226.872L140.674 226.728V226.12L143.346 225.112L143.602 225.272L143.714 226.52C144.098 226.083 144.514 225.741 144.962 225.496C145.421 225.24 145.896 225.112 146.386 225.112C147.421 225.112 148.088 225.597 148.386 226.568C148.813 226.056 149.256 225.688 149.714 225.464C150.173 225.229 150.648 225.112 151.138 225.112C151.864 225.112 152.408 225.336 152.77 225.784C153.133 226.232 153.314 226.947 153.314 227.928V229.64C153.314 230.003 153.314 230.413 153.314 230.872C153.314 231.32 153.32 231.747 153.33 232.152L154.306 232.344V233H150.402V232.344L151.394 232.136C151.405 231.741 151.41 231.32 151.41 230.872C151.41 230.413 151.41 230.003 151.41 229.64V228.168C151.41 227.496 151.32 227.043 151.138 226.808C150.968 226.573 150.68 226.456 150.274 226.456C149.709 226.456 149.122 226.728 148.514 227.272C148.525 227.379 148.53 227.491 148.53 227.608C148.541 227.725 148.546 227.848 148.546 227.976V229.64C148.546 230.003 148.546 230.413 148.546 230.872C148.546 231.32 148.552 231.747 148.562 232.152L149.522 232.344V233H145.602V232.344L146.626 232.136C146.637 231.741 146.642 231.32 146.642 230.872C146.642 230.413 146.642 230.003 146.642 229.64V228.2C146.642 227.549 146.557 227.096 146.386 226.84C146.226 226.584 145.938 226.456 145.522 226.456C145.224 226.456 144.925 226.531 144.626 226.68C144.338 226.819 144.056 227.011 143.778 227.256V229.64C143.778 229.992 143.778 230.397 143.778 230.856C143.778 231.315 143.784 231.747 143.794 232.152L144.738 232.344V233H140.786ZM159.079 225.88C158.823 225.88 158.567 225.965 158.311 226.136C158.066 226.296 157.852 226.563 157.671 226.936C157.5 227.309 157.394 227.816 157.351 228.456H159.543C159.927 228.456 160.183 228.376 160.311 228.216C160.439 228.056 160.503 227.832 160.503 227.544C160.503 227.053 160.364 226.653 160.087 226.344C159.81 226.035 159.474 225.88 159.079 225.88ZM159.079 233.224C158.332 233.224 157.676 233.064 157.111 232.744C156.546 232.424 156.103 231.965 155.783 231.368C155.463 230.76 155.303 230.04 155.303 229.208C155.303 228.355 155.484 227.624 155.847 227.016C156.22 226.397 156.7 225.928 157.287 225.608C157.884 225.277 158.519 225.112 159.191 225.112C159.82 225.112 160.37 225.245 160.839 225.512C161.308 225.779 161.671 226.152 161.927 226.632C162.194 227.112 162.327 227.677 162.327 228.328C162.327 228.669 162.295 228.963 162.231 229.208H157.335C157.378 230.125 157.618 230.813 158.055 231.272C158.503 231.731 159.063 231.96 159.735 231.96C160.204 231.96 160.599 231.869 160.919 231.688C161.25 231.496 161.548 231.251 161.815 230.952L162.279 231.368C161.97 231.955 161.543 232.413 160.999 232.744C160.466 233.064 159.826 233.224 159.079 233.224Z" fill="white"/>
<rect x="43" y="46" width="186" height="73" rx="20" fill="black" fill-opacity="0.3"/>
<path opacity="0.5" d="M64.8828 99.816L68.1788 96.36H76.0828L79.1868 99.816H64.8828ZM63.9227 84.104L67.3788 87.432V95.272L63.9227 98.408V84.104ZM80.2108 98.408L76.7548 95.112V87.24L80.2108 84.104V98.408ZM64.8508 67.304H79.1548L75.9868 70.76H68.1468L64.8508 67.304ZM63.8268 82.984V68.68L67.2828 71.784V79.72L63.8268 82.984ZM80.1148 68.68V82.984L76.6588 79.88V71.976L80.1148 68.68ZM90.4765 99.816L93.7725 96.36H101.677L104.781 99.816H90.4765ZM89.5165 84.104L92.9725 87.432V95.272L89.5165 98.408V84.104ZM105.805 98.408L102.349 95.112V87.24L105.805 84.104V98.408ZM90.4445 67.304H104.749L101.581 70.76H93.7405L90.4445 67.304ZM89.4205 82.984V68.68L92.8765 71.784V79.72L89.4205 82.984ZM105.709 68.68V82.984L102.253 79.88V71.976L105.709 68.68ZM116.07 99.816L119.366 96.36H127.27L130.374 99.816H116.07ZM115.11 84.104L118.566 87.432V95.272L115.11 98.408V84.104ZM131.398 98.408L127.942 95.112V87.24L131.398 84.104V98.408ZM116.038 67.304H130.342L127.174 70.76H119.334L116.038 67.304ZM115.014 82.984V68.68L118.47 71.784V79.72L115.014 82.984ZM131.302 68.68V82.984L127.846 79.88V71.976L131.302 68.68Z" fill="white"/>
<path d="M157.211 98.408L153.755 95.112V87.24L157.211 84.104V98.408ZM144.635 85.256C143.888 84.6587 143.131 84.072 142.363 83.496L144.635 81.8H153.371L155.611 83.496L153.371 85.256H144.635ZM141.851 67.304H156.155L152.987 70.76H145.147L141.851 67.304ZM140.827 82.984V68.68L144.283 71.784V79.72L140.827 82.984ZM157.115 68.68V82.984L153.659 79.88V71.976L157.115 68.68ZM182.805 98.408L179.349 95.112V87.24L182.805 84.104V98.408ZM170.229 85.256C169.482 84.6587 168.725 84.072 167.957 83.496L170.229 81.8H178.965L181.205 83.496L178.965 85.256H170.229ZM167.445 67.304H181.749L178.581 70.76H170.741L167.445 67.304ZM166.421 82.984V68.68L169.877 71.784V79.72L166.421 82.984ZM182.709 68.68V82.984L179.253 79.88V71.976L182.709 68.68ZM208.398 98.408L204.942 95.112V87.24L208.398 84.104V98.408ZM195.822 85.256C195.076 84.6587 194.318 84.072 193.55 83.496L195.822 81.8H204.558L206.798 83.496L204.558 85.256H195.822ZM193.038 67.304H207.342L204.174 70.76H196.334L193.038 67.304ZM192.014 82.984V68.68L195.47 71.784V79.72L192.014 82.984ZM208.302 68.68V82.984L204.846 79.88V71.976L208.302 68.68Z" fill="white"/>
</g>
<defs>
<filter id="filter0_n_127_3546" x="0" y="0" width="272" height="334" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves="3" result="noise" seed="9595" />
<feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
<feComponentTransfer in="alphaNoise" result="coloredNoise1">
<feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "/>
</feComponentTransfer>
<feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
<feFlood flood-color="rgba(0, 0, 0, 0.2)" result="color1Flood" />
<feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
<feMerge result="effect1_noise_127_3546">
<feMergeNode in="shape" />
<feMergeNode in="color1" />
</feMerge>
</filter>
</defs>
</svg>`;

const DARK_TASBIH_SVG = LIGHT_TASBIH_SVG
  .replace('fill="#FEA1CD"/>', 'fill="#FEA1CD" fill-opacity="0.32"/>')
  .replace('stroke="black" stroke-opacity="0.1"', 'stroke="#FEA1CD" stroke-opacity="0.24"')
  .replace(
    '<circle cx="136" cy="228" r="60" fill="black" fill-opacity="0.1"/>',
    '<circle cx="136" cy="228" r="60" fill="#FEA1CD" fill-opacity="0.24"/>'
  )
  .replace(
    '<circle cx="136.5" cy="228.5" r="45.5" fill="black" fill-opacity="0.1"/>',
    '<circle cx="136.5" cy="228.5" r="45.5" fill="#FEA1CD" fill-opacity="0.24"/>'
  )
  .replace(
    '<rect x="43" y="46" width="186" height="73" rx="20" fill="black" fill-opacity="0.3"/>',
    '<rect x="43" y="46" width="186" height="73" rx="20" fill="black" fill-opacity="0.7"/>'
  );

export default function TasbihScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppColors();

  const [count, setCount] = useState(999);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isResetSheetVisible, setIsResetSheetVisible] = useState(false);

  const pageBg = isDark ? colors.background : '#F2F2F2';
  const headerBtnBg = isDark ? colors.surface : '#E9E9E9';
  const titleColor = isDark ? colors.text : '#141B24';
  const mutedText = isDark ? colors.textMuted : '#5C636D';
  const actionBg = isDark ? colors.surface : '#E9E9E9';
  const displayBg = isDark ? '#0E1116' : '#986488';
  const tasbihSvg = isDark ? DARK_TASBIH_SVG : LIGHT_TASBIH_SVG;
  const resetOverlayBg = isDark ? 'rgba(0, 0, 0, 0.42)' : 'rgba(10, 14, 21, 0.18)';
  const resetSheetBg = isDark ? '#1F2125' : '#F4F4F4';
  const resetHandleBg = isDark ? '#8A8F95' : '#9FA1A4';
  const resetCloseBg = isDark ? '#101318' : '#ECECEC';
  const resetCloseIconColor = isDark ? '#F6F8FB' : '#141B24';
  const resetTitleColor = isDark ? '#F3F5F7' : '#111821';
  const resetSubtitleColor = isDark ? '#B3B7BC' : '#5B6268';
  const resetCancelColor = isDark ? '#B3B7BC' : '#5B6268';
  const resetConfirmBg = isDark ? 'rgba(240, 74, 74, 0.10)' : 'rgba(240, 74, 74, 0.07)';
  const resetConfirmColor = '#F04A4A';
  const resetIconBg = isDark ? '#342528' : '#E2D3D5';

  const displayValue = useMemo(() => String(count).padStart(6, '0'), [count]);

  const handleCount = () => {
    setCount((prev) => (prev >= 999999 ? 0 : prev + 1));
  };

  const handleCloseResetSheet = () => setIsResetSheetVisible(false);
  const handleOpenResetSheet = () => setIsResetSheetVisible(true);
  const handleConfirmReset = () => {
    setCount(0);
    setIsResetSheetVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: pageBg, paddingTop: insets.top + 8 }]}> 
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.headerBtn, { backgroundColor: headerBtnBg }]}>
          <IconSymbol name="arrow.left" size={22} color={titleColor} />
        </TouchableOpacity>
        <ThemedText type="poppins-semibold" style={[styles.headerTitle, { color: titleColor }]}>Tasbih</ThemedText>
      </View>

      <View style={styles.content}>
        <View style={styles.dhikrBlock}>
          <ThemedText type="amiri-bold" style={[styles.arabicText, { color: titleColor }]}>سُبْحَانَ اللهِ</ThemedText>
          <ThemedText type="poppins-regular" style={[styles.transliteration, { color: mutedText }]}>Subhana lah</ThemedText>
        </View>

        <View style={styles.counterWrapper}>
          <View style={styles.counterSvgContainer}>
            <SvgXml xml={tasbihSvg} width={COUNTER_WIDTH} height={COUNTER_HEIGHT} />

            <View pointerEvents="none" style={[styles.displayOverlay, { backgroundColor: displayBg }]}>
              {isDark ? (
                <View style={styles.segmentDigitsRow}>
                  {displayValue.split('').map((digit, index) => (
                    <SevenSegmentDigit key={`${index}-${digit}`} value={digit} />
                  ))}
                </View>
              ) : (
                <ThemedText type="poppins-medium" style={styles.counterDigits}>
                  {displayValue}
                </ThemedText>
              )}
            </View>

            <Pressable style={styles.tapZone} onPress={handleCount} />
          </View>
        </View>

        <View style={[styles.bottomRow, { paddingBottom: insets.bottom + 10 }]}> 
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setSoundEnabled((prev) => !prev)}
            style={[styles.soundButton, { backgroundColor: actionBg }]}
          >
            <IconSymbol
              name={soundEnabled ? 'speaker.wave.2.fill' : 'speaker.slash.fill'}
              size={30}
              color={titleColor}
            />
            <ThemedText type="poppins-medium" style={[styles.soundText, { color: titleColor }]}> 
              {soundEnabled ? 'Sound on' : 'Sound off'}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleOpenResetSheet}
            style={[styles.resetButton, { backgroundColor: actionBg }]}
          >
            <IconSymbol name="arrow.counterclockwise" size={34} color={titleColor} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isResetSheetVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseResetSheet}
      >
        <View style={[styles.resetOverlay, { backgroundColor: resetOverlayBg }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleCloseResetSheet} />

          <View
            style={[
              styles.resetSheet,
              { paddingBottom: Math.max(34, insets.bottom + 20), backgroundColor: resetSheetBg },
            ]}
          >
            <View style={[styles.resetHandle, { backgroundColor: resetHandleBg }]} />

            <View style={styles.resetTopRow}>
              <View style={[styles.resetMoodWrap, { backgroundColor: resetIconBg }]}>
                <ResetAngryIcon />
              </View>
              <TouchableOpacity
                accessibilityRole="button"
                onPress={handleCloseResetSheet}
                style={[styles.resetCloseButton, { backgroundColor: resetCloseBg }]}
              >
                <IconSymbol name="xmark" size={33} color={resetCloseIconColor} />
              </TouchableOpacity>
            </View>

            <ThemedText type="poppins-regular" style={[styles.resetTitle, { color: resetTitleColor }]}>
              Reset tasbih?
            </ThemedText>

            <ThemedText type="poppins-regular" style={[styles.resetSubtitle, { color: resetSubtitleColor }]}>
              You have clicked {count} times today.{'\n'}
              Resetting will clear your dhikr count.
            </ThemedText>

            <View style={styles.resetActionsRow}>
              <TouchableOpacity
                accessibilityRole="button"
                onPress={handleCloseResetSheet}
                style={styles.resetCancelButton}
              >
                <ThemedText type="poppins-regular" style={[styles.resetCancelText, { color: resetCancelColor }]}>
                  No, Cancel
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                accessibilityRole="button"
                onPress={handleConfirmReset}
                style={[styles.resetConfirmButton, { backgroundColor: resetConfirmBg }]}
              >
                <ThemedText type="poppins-regular" style={[styles.resetConfirmText, { color: resetConfirmColor }]}>
                  Yes, Clear
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 22,
    lineHeight: 28,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dhikrBlock: {
    alignItems: 'center',
    marginTop: 36,
    marginBottom: 26,
  },
  arabicText: {
    fontSize: 22,
    lineHeight: 34,
    marginBottom: 8,
  },
  transliteration: {
    fontSize: 14,
    lineHeight: 20,
  },
  counterWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterSvgContainer: {
    width: COUNTER_WIDTH,
    height: COUNTER_HEIGHT,
    position: 'relative',
  },
  displayOverlay: {
    position: 'absolute',
    top: '15.3%',
    left: '16.1%',
    width: '68.4%',
    height: '21%',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterDigits: {
    fontSize: 44,
    lineHeight: 46,
    letterSpacing: 1.2,
    color: '#ECE7EB',
    fontFamily: 'monospace',
    fontVariant: ['tabular-nums'],
    textAlign: 'center',
  },
  segmentDigitsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  tapZone: {
    position: 'absolute',
    width: '35%',
    aspectRatio: 1,
    borderRadius: 999,
    top: '54%',
    left: '32.5%',
  },
  bottomRow: {
    marginTop: 'auto',
    flexDirection: 'row',
    gap: 12,
  },
  soundButton: {
    flex: 1,
    height: 66,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  soundText: {
    fontSize: 18,
    lineHeight: 24,
  },
  resetButton: {
    width: 92,
    height: 66,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  resetSheet: {
    width: '100%',
    height: 401,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 14,
    marginBottom: 0,
  },
  resetHandle: {
    width: 150,
    height: 10,
    borderRadius: 6,
    alignSelf: 'center',
    opacity: 0.7,
  },
  resetTopRow: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  resetMoodWrap: {
    width: 112,
    height: 112,
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetCloseButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetTitle: {
    marginTop: 14,
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.2,
    fontWeight: '400',
  },
  resetSubtitle: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: 26,
  },
  resetActionsRow: {
    marginTop: 'auto',
    paddingTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  resetCancelButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 74,
  },
  resetCancelText: {
    fontSize: 20,
    lineHeight: 26,
  },
  resetConfirmButton: {
    width: 172,
    height: 74,
    borderRadius: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetConfirmText: {
    fontSize: 20,
    lineHeight: 26,
  },
});
