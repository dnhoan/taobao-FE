import { OrderDetailDTO } from './OrderDetailDTO.interface';
import { UserDTO } from './UserDto.interface';

export interface OrderDTO {
  id: number;
  orderId: string;
  user: UserDTO;
  orderStatus: number;
  customerName: string;
  status: string;
  deliveryAddress: string;
  phoneNumber: string;
  totalMoney: number;
  note: string;
  cancelNote: string;
  ctime: string;
  mtime: string;
  orderDetailDTOS: OrderDetailDTO[];
}
