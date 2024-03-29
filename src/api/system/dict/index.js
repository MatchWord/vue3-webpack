import request from "@/utils/request";

/**
 * 获取字典类型分页列表
 *
 * @param queryParams
 */
export function listDictTypePages(queryParams) {
  return request({
    url: "/youlai-system/api/v1/dict/types/pages",
    method: "get",
    params: queryParams,
  });
}

/**
 * 获取字典类型表单数据
 *
 * @param id
 */
export function getDictTypeForm(id) {
  return request({
    url: "/youlai-system/api/v1/dict/types/" + id + "/form",
    method: "get",
  });
}

/**
 * 新增字典类型
 *
 * @param data
 */
export function addDictType(data) {
  return request({
    url: "/youlai-system/api/v1/dict/types",
    method: "post",
    data: data,
  });
}

/**
 * 修改字典类型
 *
 * @param id
 * @param data
 */
export function updateDictType(id, data) {
  return request({
    url: "/youlai-system/api/v1/dict/types/" + id,
    method: "put",
    data: data,
  });
}

/**
 * 删除字典类型
 */
export function deleteDictTypes(ids) {
  return request({
    url: "/youlai-system/api/v1/dict/types/" + ids,
    method: "delete",
  });
}

/**
 * 获取字典类型的数据项
 *
 * @param typeCode 字典类型编码
 */
export function listDictItemsByTypeCode(typeCode) {
  return request({
    url: "/youlai-system/api/v1/dict/types/" + typeCode + "/items",
    method: "get",
  });
}

/**
 * 获取字典项分页列表
 */
export function listDictItemPages(queryParams) {
  return request({
    url: "/youlai-system/api/v1/dict/items/pages",
    method: "get",
    params: queryParams,
  });
}

/**
 * 获取字典数据项表单数据
 *
 * @param id
 */
export function getDictItemData(id) {
  return request({
    url: "/youlai-system/api/v1/dict/items/" + id + "/form",
    method: "get",
  });
}

/**
 * 新增字典项
 *
 * @param data
 */
export function saveDictItem(data) {
  return request({
    url: "/youlai-system/api/v1/dict/items",
    method: "post",
    data: data,
  });
}

/**
 * 修改字典项
 *
 * @param id
 * @param data
 */
export function updateDictItem(id, data) {
  return request({
    url: "/youlai-system/api/v1/dict/items/" + id,
    method: "put",
    data: data,
  });
}

/**
 * 批量删除字典数据项
 *
 * @param ids 字典项ID，多个以英文逗号(,)分割
 */
export function deleteDictItems(ids) {
  return request({
    url: "/youlai-system/api/v1/dict/items/" + ids,
    method: "delete",
  });
}
