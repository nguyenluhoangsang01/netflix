import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { planState } from "../atoms/planAtom";
import { Product } from "../types";

interface Props {
  products: Product[];
}

const Table = ({ products }: Props) => {
  const plan = useRecoilValue(planState);

  return (
    <table className="tablePlan">
      <tbody>
        <tr>
          <td>Monthly price</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={plan !== product.name ? "colNotSelected" : ""}
            >
              ${product.price}
            </td>
          ))}
        </tr>

        <tr>
          <td>Video quality</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={plan !== product.name ? "colNotSelected" : ""}
            >
              {product.videoQuality}
            </td>
          ))}
        </tr>
        <tr>
          <td>Resolution</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={plan !== product.name ? "colNotSelected" : ""}
            >
              {product.resolution}
            </td>
          ))}
        </tr>
        <tr>
          <td>Portability</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={plan !== product.name ? "colNotSelected" : ""}
            >
              {product.portability ? (
                <AiOutlineCheck />
              ) : (
                <span>
                  <AiOutlineClose />
                </span>
              )}
            </td>
          ))}
        </tr>
        <tr>
          <td>Ads</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={plan !== product.name ? "colNotSelected" : ""}
            >
              {product.ads ? (
                <AiOutlineCheck />
              ) : (
                <span>
                  <AiOutlineClose />
                </span>
              )}
            </td>
          ))}
        </tr>
        <tr>
          <td>Ultra HD</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={plan !== product.name ? "colNotSelected" : ""}
            >
              {product.ultraHD ? (
                <AiOutlineCheck />
              ) : (
                <span>
                  <AiOutlineClose />
                </span>
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
