import {
  Select,
  Space,
  Divider,
  Form,
  Button,
  InputNumber,
  DatePicker,
  Result,
} from "antd";
import { useRef, useState } from "react";
import { useCrypto } from "../context/crypto-context";
import { CoinInfo } from "./CoinInfo";

export function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const [coin, setCoin] = useState(null);
  const [select, setSelect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef(null);
  // @ts-ignore
  const { crypto, addAsset } = useCrypto();

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
  }

  const validateMessages = {
    required: "${name} is required!",
    types: {
      number: "${label} is not valid number",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    });
  }

  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      price: values.price,
      amount: values.amount,
      date: values.date?.$d ?? new Date(),
    };

    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  }

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: 250 }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: "20px" }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{ price: +coin.price.toFixed(2) }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />

      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            min: 0,
            type: "number",
          },
        ]}
      >
        <InputNumber
          onChange={handleAmountChange}
          placeholder="Enter coin amount"
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber
          onChange={handlePriceChange}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber
          disabled
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
