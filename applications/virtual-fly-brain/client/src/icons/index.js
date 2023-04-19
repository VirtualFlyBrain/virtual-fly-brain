export const Logo = (props) => {
  return (
    <svg {...props} width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.93975 5.70082L5.6746 3.75927L6.3254 3.00001L12.3759 8.18616C13.0615 7.45312 14.0065 6.504 14.9402 5.6902C15.4866 5.21403 16.0399 4.77465 16.5421 4.45139C16.7933 4.28975 17.0411 4.15097 17.276 4.05123C17.5053 3.95391 17.7547 3.87964 18 3.87964V4.87964C17.9453 4.87964 17.8378 4.89912 17.6668 4.97172C17.5014 5.04191 17.3056 5.14921 17.0834 5.29226C16.6389 5.57837 16.1266 5.98275 15.5973 6.44407C14.708 7.21906 13.8012 8.1279 13.1359 8.83758L13.2141 8.90465C13.3107 8.8887 13.4065 8.87964 13.5 8.87964C13.8817 8.87964 14.203 9.02565 14.4622 9.22199C14.7937 8.91311 15.2177 8.54751 15.6538 8.22681C15.9494 8.00949 16.2611 7.8049 16.5611 7.65258C16.8486 7.50659 17.1802 7.37964 17.5 7.37964C18.046 7.37964 18.4876 7.60824 18.8045 7.86794C19.0015 8.02944 19.1608 8.21112 19.2798 8.37964H22V9.37964H19H18.691L18.5528 9.10325C18.4984 8.99457 18.3662 8.8017 18.1705 8.64133C17.979 8.48437 17.754 8.37964 17.5 8.37964C17.4198 8.37964 17.2597 8.41935 17.0139 8.5442C16.7805 8.66271 16.5173 8.83312 16.2462 9.03246C15.8361 9.334 15.4322 9.6837 15.1213 9.97469C15.163 10.0423 15.2016 10.1099 15.2371 10.1766C15.4134 10.0823 15.6244 9.97316 15.8456 9.86664C16.1344 9.72758 16.4532 9.58696 16.7403 9.49123C16.8834 9.44353 17.0317 9.40255 17.1722 9.3807C17.2999 9.36083 17.4814 9.34639 17.6581 9.4053C18.3354 9.63107 19.5 10.5374 19.5 12.3796C19.5 13.2791 19.2207 14.1134 18.8722 14.7266C18.698 15.0333 18.4977 15.3003 18.2901 15.498C18.1066 15.6727 17.8278 15.8796 17.5 15.8796C17.3373 15.8796 17.1771 15.8249 17.0633 15.7794C16.9353 15.7282 16.797 15.6595 16.659 15.5842C16.3822 15.4332 16.0713 15.2364 15.7851 15.0457C15.5749 14.9055 15.3737 14.7657 15.2032 14.6448C15.1774 14.6912 15.1501 14.7379 15.1213 14.7846C15.4322 15.0756 15.8361 15.4253 16.2462 15.7268C16.5173 15.9262 16.7805 16.0966 17.0139 16.2151C17.2597 16.3399 17.4198 16.3796 17.5 16.3796C17.754 16.3796 17.979 16.2749 18.1705 16.1179C18.3662 15.9576 18.4984 15.7647 18.5528 15.656L18.691 15.3796H19H22V16.3796H19.2798C19.1608 16.5482 19.0015 16.7298 18.8045 16.8913C18.4876 17.151 18.046 17.3796 17.5 17.3796C17.1802 17.3796 16.8486 17.2527 16.5611 17.1067C16.2611 16.9544 15.9494 16.7498 15.6538 16.5325C15.2177 16.2118 14.7937 15.8462 14.4622 15.5373C14.323 15.6427 14.1658 15.7337 13.991 15.7953C14.6059 16.4334 15.3577 17.1706 16.0973 17.8152C16.6266 18.2765 17.1389 18.6809 17.5834 18.967C17.8056 19.1101 18.0014 19.2174 18.1668 19.2876C18.3378 19.3602 18.4453 19.3796 18.5 19.3796V20.3796C18.2547 20.3796 18.0053 20.3054 17.776 20.208C17.5411 20.1083 17.2933 19.9695 17.0421 19.8079C16.5399 19.4846 15.9866 19.0452 15.4402 18.5691C14.5065 17.7553 13.5615 16.8062 12.8759 16.0731L6.8254 21.2593L6.1746 20.5L7.7419 19.1566C6.64721 19.3579 5.62858 19.2328 4.82917 18.9421L4.74706 18.9123L4.67995 18.8563C4.12172 18.3911 3.46215 17.5269 3.52597 16.4793C3.55313 16.0334 3.70741 15.5968 4.0075 15.1796C3.66468 14.9768 3.25082 14.6769 2.88958 14.3012C2.43323 13.8266 2 13.1663 2 12.3796C2 11.593 2.43323 10.9327 2.88958 10.4581C3.23493 10.0989 3.62837 9.80898 3.96185 9.60696C3.6917 9.20963 3.55172 8.79529 3.52597 8.37254C3.46215 7.32497 4.12172 6.46072 4.67995 5.99553L4.74706 5.9396L4.82917 5.90974C5.66528 5.6057 6.75987 5.4616 7.93975 5.70082ZM6.00871 10.075L6.61803 10.3796H10.3357C10.6785 10.1311 11.1673 9.80528 11.6747 9.52306C10.6243 8.0148 9.45777 7.22124 8.37633 6.85294C7.18996 6.44891 6.06919 6.54402 5.2549 6.82004C4.84072 7.18995 4.48972 7.74707 4.52412 8.31174C4.55245 8.77694 4.85859 9.42106 6.00871 10.075ZM6.68111 14.3796L6.70311 14.4291C4.97586 15.1968 4.55748 15.9925 4.52412 16.5401C4.48972 17.1047 4.84064 17.6618 5.25475 18.0317C6.78599 18.5478 9.49451 18.3776 11.6751 15.2365C11.1676 14.9542 10.6786 14.6283 10.3357 14.3796H6.68111Z" fill={props.color || "white"} />
    </svg>

  )
}

export const History = (props) => {
  return (
    <svg {...props} width={props.size || 20} height={props.size || 20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.25 2.5C7.10833 2.5 3.75 5.85833 3.75 10H1.25L4.49167 13.2417L4.55 13.3583L7.91667 10H5.41667C5.41667 6.775 8.025 4.16667 11.25 4.16667C14.475 4.16667 17.0833 6.775 17.0833 10C17.0833 13.225 14.475 15.8333 11.25 15.8333C9.64167 15.8333 8.18333 15.175 7.13333 14.1167L5.95 15.3C7.30833 16.6583 9.175 17.5 11.25 17.5C15.3917 17.5 18.75 14.1417 18.75 10C18.75 5.85833 15.3917 2.5 11.25 2.5ZM10.4167 6.66667V10.8333L13.9583 12.9333L14.6 11.8667L11.6667 10.125V6.66667H10.4167Z" fill={props.color || "white"} />
    </svg>

  )
}

export const QueryStats = (props) => {
  return (
    <svg {...props} width={props.size || 20} height={props.size || 20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5667 14.975C16.9333 14.3917 17.15 13.7167 17.15 12.9833C17.15 10.9083 15.475 9.23333 13.4 9.23333C11.325 9.23333 9.65001 10.9083 9.65001 12.9833C9.65001 15.0583 11.325 16.7333 13.3917 16.7333C14.125 16.7333 14.8083 16.5167 15.3833 16.15L17.9833 18.75L19.1667 17.5667L16.5667 14.975ZM13.4 15.0667C12.25 15.0667 11.3167 14.1333 11.3167 12.9833C11.3167 11.8333 12.25 10.9 13.4 10.9C14.55 10.9 15.4833 11.8333 15.4833 12.9833C15.4833 14.1333 14.55 15.0667 13.4 15.0667ZM13.1 7.98333C12.4833 8 11.8917 8.13333 11.35 8.35833L10.8917 7.66667L7.72501 12.8167L5.21668 9.88333L2.19168 14.725L0.833344 13.75L5.00001 7.08333L7.50001 10L10.8333 4.58333L13.1 7.98333ZM15.2583 8.4C14.725 8.16667 14.15 8.025 13.55 7.99167L17.8167 1.25L19.1667 2.23333L15.2583 8.4Z" fill={props.color || "white"} />
    </svg>

  )
}

export const Menu = (props) => {
  return (
    <svg {...props} width={props.size || 20} height={props.size || 20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 15H17.5V13.3333H2.5V15ZM2.5 10.8333H17.5V9.16667H2.5V10.8333ZM2.5 5V6.66667H17.5V5H2.5Z" fill={props.color || "white"} />
    </svg>

  )
}

export const Search = (props) => {
  return (
    <svg {...props} width={props.size || 20} height={props.size || 20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.1292 11.8791H12.4708L12.2375 11.6541C13.0542 10.7041 13.5458 9.47074 13.5458 8.12907C13.5458 5.1374 11.1208 2.7124 8.12917 2.7124C5.1375 2.7124 2.7125 5.1374 2.7125 8.12907C2.7125 11.1207 5.1375 13.5457 8.12917 13.5457C9.47083 13.5457 10.7042 13.0541 11.6542 12.2374L11.8792 12.4707V13.1291L16.0458 17.2874L17.2875 16.0457L13.1292 11.8791ZM8.12917 11.8791C6.05417 11.8791 4.37917 10.2041 4.37917 8.12907C4.37917 6.05407 6.05417 4.37907 8.12917 4.37907C10.2042 4.37907 11.8792 6.05407 11.8792 8.12907C11.8792 10.2041 10.2042 11.8791 8.12917 11.8791Z" fill={props.color || "white"} fill-opacity={props.opacity || "0.8"} />
    </svg>
  )
}