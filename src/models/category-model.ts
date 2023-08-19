interface CategoryModel {
  alias: string;
  title: string;
  parent_aliases?: string[];
  country_whitelist?: string[];
  country_blacklist?: string[];
}