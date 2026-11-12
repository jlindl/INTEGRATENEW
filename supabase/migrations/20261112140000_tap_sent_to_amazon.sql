-- Admin tick for plates shipped to Amazon FBA.
alter table public.tap_plates add column if not exists sent_to_amazon_at timestamptz;
