import store from '../store';

const {
  CREATE_ORDER,
  PUT_ORDER,
  DEL_MENU_ORDER,
  UPDATE_ORDER,
  PROCESS_ORDER,
  EMPTY_ORDER,
} = require('../TypeActions');

const globalOrder = {
  kode_pesanan: null,
  nama_pesanan: null,
  status: 'tunggu',
  tgl: null,
  menu: [],
  total_bayar: 0,
};
// const cek = (data) => {
//   const index = globalOrder.menu.findIndex((e) => e.id === data.id);
//   if (index) {
//     return (globalOrder.menu[index] = {
//       ...globalOrder.menu[index],
//       jumlah: data.jumlah,
//       harga_total: data.harga_total,
//     });
//   }
// };

const OrderReducer = (state = globalOrder, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      const new_menu = state.menu.filter(
        (e) => e.id_daftar_menu !== action.payload.id_daftar_menu,
      );
      const menu_order = [...new_menu, action.payload];
      const total_harga_order = menu_order.reduce((total, item) => {
        return item.harga_total + total;
      }, 0);

      return {
        ...state,
        menu: menu_order,
        total_bayar: total_harga_order,
      };

    case UPDATE_ORDER:
      const menuUpdate = state.menu.map((val) =>
        val.id_daftar_menu === action.payload.id_daftar_menu
          ? {
              ...val,
              jumlah: action.payload.jumlah,
              harga_total: action.payload.jumlah * val.harga_satuan,
            }
          : val,
      );

      const totalHarga = menuUpdate.reduce((total, item) => {
        return item.harga_total + total;
      }, 0);

      return {
        ...state,
        menu: menuUpdate,
        total_bayar: totalHarga,
      };

    case PROCESS_ORDER:
      return {
        ...state,
        kode_pesanan: action.payload.kode_pesanan,
        nama_pesanan: action.payload.nama_pesanan,
        status: action.payload.status,
      };

    case EMPTY_ORDER:
      return {
        ...state,
        kode_pesanan: null,
        nama_pesanan: null,
        status: 'tunggu',
        tgl: null,
        menu: [],
        total_bayar: 0,
      };

    case DEL_MENU_ORDER:
      const menuDel = state.menu.filter(
        (val) => val.id_daftar_menu !== action.payload,
      );

      const harga_delete = menuDel.reduce((total, item) => {
        return item.harga_total + total;
      }, 0);

      return {
        ...state,
        menu: menuDel,
        total_bayar: harga_delete,
      };

    default:
      return state;
  }
};

export default OrderReducer;
